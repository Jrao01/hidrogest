const { where } = require('sequelize');
const sectoress = require('../models/sectores.js')
const Users = require('../models/users.js')


sectoress.hasMany(Users,{
    foreignKey:'sectorId',
    as:'sector'
});

Users.belongsTo(sectoress,{
    foreignKey:'sectorId',
    as:'sector'
});


const index = (req,res)=>{
    try{
        res.render('index');
    }catch(error){
            console.error(error.message);
            res.status(500).send('error en el servidor');
        }
    };

const getEditar = async(req,res)=>{
    try{
        const {id} = req.params.id;
        console.log(id)
        const sector = await sectoress.findOne({Where:{id}});
        res.render('admin/editSector',{sector})

    }catch(error){
        console.error(error.message);
        res.status(500).send("Error al registrarse");
    }
}

const register = async(req,res)=>{
    try{
        const sectoressData = await sectoress.findAll();
        res.render('register',{sectoressData});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Error al registrarse");
    }
}

const getTabla = async(req,res)=>{
    try{
        const sectoresdata = await sectoress.findAll()
        res.render('admin/tabla',{sectoresdata});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Error al registrarse");
    }
}


const renderLanding = async (req, res) => {
    try {
        console.log('---------------');
        console.log(req.session.user);
        console.log('---------------');

        if (req.session.user) {
            const userdata = await Users.findOne({
                where: { id: req.session.user.id },
                include: [{
                    model: sectoress,
                    as: 'sector', // Usando el alias definido en la asociación
                    attributes: ['nombre','status'] 
                }]
            });

            const allSectors = await sectoress.findAll()
            console.log('------')
            console.log(allSectors)
            console.log('------')
            res.render('landing', { userdata, allSectors });
        } else {
            res.redirect('/login'); // Redirigir al login si no hay datos de usuario en la sesión
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error al cargar la página");
    }
}



// posts

const eidtPost = async (req,res)=>{
    try{
        const {nombre, status, coords, id} = req.body;
        await sectoress.update({nombre,status,coords}, {where:{id}})
        res.redirect('/admin/tabla')

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error al cargar la página");
    }
}

const registerPost = async (req, res) => {
    try {
        const { nombre, email, cedula, telefono, sectorId, coordenadasCasa, tipoPropiedad, cedulaOwner, alquilado, personasEnvivienda, password } = req.body;
        const newUser = await Users.create({ nombre, email, cedula, telefono, sectorId, coordenadasCasa, tipoPropiedad, cedulaOwner, alquilado, personasEnvivienda, password });
        await sectoress.increment('habitantes', { by: 1, where: { id: sectorId } });
        
        // Guardar datos del nuevo usuario en la sesión
        console.log(newUser)
        req.session.user = newUser;

        res.redirect('/landing');
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error al registrarse");
    }
};
const sectorAdded = async(req,res)=>{
    try{
        const {nombre, status, coords} = req.body;
        console.log(nombre, status,coords)
        await sectoress.create({nombre,status,coords})
        console.log('hola')
        res.redirect('/admin/tabla');
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Error al iniciar sesión");
    }
}

const changeStatus = async (req,res)=>{
    try{
        const {id,status} = req.params
        let newstatus
        if(status == 'activo'){
            newstatus = 'inactivo'
        }else{
            newstatus = 'activo'
        }
        console.log(newstatus)
        await sectoress.update({status: newstatus},{where:{id}});
        res.redirect('/admin/tabla')

    }catch (error) {
        console.error(error.message);
        res.status(500).send("Error al iniciar sesión");
    }
}
const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === 'admin@gmail.com' && password === 'admin123') {
            res.redirect('/admin/tabla');
        } else {
            const userdata = await Users.findOne({
                where: {
                    email: email,
                    password: password
                }
            });

            console.log('probando userdata desde loginpost ')
            console.log(userdata)
            console.log('probando userdata desde loginpost ')

            if (userdata) {
                req.session.user = userdata; // Guardar datos del usuario en la sesión
                res.redirect('/landing'); // Redirigir a la ruta de la plantilla 'landing'
            } else {
                res.status(401).send("Email o contraseña incorrectos");
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error al iniciar sesión");
    }
}



module.exports={index,loginPost,register,sectorAdded,registerPost,changeStatus,getTabla,renderLanding,getEditar,eidtPost}