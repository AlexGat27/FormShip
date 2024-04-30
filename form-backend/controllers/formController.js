const shipModel = require('../models/shipModel')

class FormController{
    async saveForm(req, res){
        const { id, system, description } = req.body;
        const candidate = await shipModel.findOne({where: { id: id}});
        if (candidate){return res.status(400).json({error: "Такая модель уже есть в БД"})};

        let new_ship = await shipModel.create({
            id: id,
            shipSystem: system,
            description: description,
        }).then(console.log("Успешно добавлена модель"))

        res.json({message: "Успешно добавлена модель"})
    }
}

module.exports = new FormController();