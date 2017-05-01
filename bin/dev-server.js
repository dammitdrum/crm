
const project = require('../config/project.config')
const app = require('../server/main')
const debug = require('debug')('app:bin:dev-server')
const bodyParser= require('body-parser')

const mongoose = require('mongoose')
const crypto = require('crypto')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const MONGO_URL = 'mongodb://dbuser:password@ds035766.mlab.com:35766/crmdb'

app.use(bodyParser.json());
app.use(session({
    secret: 'dammitdrum',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        url: MONGO_URL,
    })
}))

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error:', err.message);
})
db.once('open', function callback () {
    console.log("Connected to DB!")
    app.listen(project.server_port)
	debug(`Server is now running at http://localhost:${project.server_port}.`)
})

// Schemas

var Schema = mongoose.Schema;

var User = new Schema({
    login: { type: String, unique: true, required: true},
    name: { type: String, required: true},
    password: { type: String, required: true},
    access: { type: String, required: true}
})

var Item = new Schema({
    art: { type: String, required: true},
    name: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, default: 0},
    debt: { type: Number, default: 0},
    ordered: { type: Number, default: 0},
    category: { type: String, default: ''}
});

var Client = new Schema({
    name: String,
    fullname: String,
    contact: String,
    person: String
})

var Deal = new Schema({
    date: { type: Date, default: Date.now },
    number: { type: Number, unique: true, required: true},
    client: Client,
    items: [{id: String, number: Number, price: Number}],
    sum: { type: Number, default: 0},
    manager: { type: Object, required: true},
    state: { type: String, default: 'new'}
});

var UserModel = mongoose.model('User', User);
var ItemModel = mongoose.model('Item', Item);
var DealModel = mongoose.model('Deal', Deal);
var ClientModel = mongoose.model('Client', Client);

function hash(text) {
    return crypto.createHash('sha1')
    .update(text).digest('base64')
}

app.post('/auth', function(req, res, next) {
    if (req.session.user) {
        return res.send({ status: 'OK', user:req.session.user });
    } else {
        return res.send('noAuth');
    }
})

app.post('/login', function(req, res, next) {
    UserModel.findOne({login:req.body.login}).then(function(user) {
        if(!user) res.send({errType:'login'});
        if (user.password === hash(req.body.password)) {
            console.log("User password is ok");
            req.session.user = {
                id: user._id, 
                login: user.login,
                name: user.name,
                access: user.access
            }
            return res.send({ status: 'OK', user:req.session.user });
        } else {
            console.log("Error auth");
            res.send({errType:'pass'});
        }
    })
 
});
 
app.post('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.send('noAuth');
    }
});

// READ

app.get('/stock/read', function (req, res) {
    readHandler(ItemModel,req,res);
});
app.get('/clients/read', function (req, res) {
    readHandler(ClientModel,req,res);
});
app.get('/deals/read', function (req, res) {
    readHandler(DealModel,req,res);
});
app.get('/users/read', function (req, res) {
    readHandler(UserModel,req,res);
});

function readHandler(Model,req,res) {
    return Model.find(function (err,items) {
        if (!err) {
            return res.send(items);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error 500' });
        }
    })
};


// CREATE

app.post('/stock/create', function (req, res) {
    var item = new ItemModel({
        art: req.body.art,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    });

    createHandler(item,res,'item');
});
app.post('/deals/create', function (req, res) {
    var deal = new DealModel({
        number: req.body.number,
        client: req.body.client,
        items: req.body.items,
        sum: req.body.sum,
        manager: req.body.manager,
        state: req.body.state
    });

   createHandler(deal,res,'deal');
});
app.post('/clients/create', function (req, res) {
    var Client = new ClientModel({
        name: req.body.name,
        fullname: req.body.fullname,
        contact: req.body.contact,
        person: req.body.person,
        type: req.body.type,
    });

    createHandler(client,res,'client');
});
app.post('/users/create', function (req, res) {
    var user = new UserModel({
        login: req.body.login,
        name: req.body.name,
        password: hash(req.body.password),
        access: req.body.access
    });

    createHandler(user,res,'user');
});

function createHandler(item,res,str) {
    item.save(function (err) {
        if (!err) {
            console.log(str+" created");
           return res.send({ status: 'OK', item:item });
        } else {
            console.log(err);
        }
    });
};


// UPDATE

app.put('/stock/update/:id', function (req, res){
   updateHandler(ItemModel,req,res,'item');
});
app.put('/deals/update/:id', function (req, res){
    updateHandler(DealModel,req,res,'deal');
});
app.put('/clients/update/:id', function (req, res){
    updateHandler(clientModel,req,res,'client');
});
app.put('/users/update/:id', function (req, res){
    updateHandler(UserModel,req,res,'user');
});

function updateHandler(Model,req,res,str) {
    return Model.findById(req.params.id, function (err, item) {
        if(!item) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        for (var key in req.body) {
            item[key] = req.body[key];
        }
        return item.save(function (err) {
            if (!err) {
                console.log(str+" updated");
                return res.send({ status: 'OK', item:item });
            } else {
                console.log(err);
            }
        });
    });
};


// DELETE

app.delete('/stock/delete/:id', function (req, res){
    deleteHandler(ItemModel,req,res,'item');
});
app.delete('/deals/delete/:id', function (req, res){
    deleteHandler(DealModel,req,res,'deal');
});
app.delete('/clients/delete/:id', function (req, res){
    deleteHandler(ClientModel,req,res,'client');
});
app.delete('/users/delete/:id', function (req, res){
    deleteHandler(UserModel,req,res,'user');
});

function deleteHandler(Model,req,res,str) {
    return Model.findById(req.params.id, function (err, item) {
        if(!item) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return item.remove(function (err) {
            if (!err) {
                console.log(str+" removed");
                return res.send({ status: 'OK' });
            } else {
                console.log(err);
            }
        });
    });
};