const { DataTypes } = require('sequelize');

// esta función le dice el día de la semana a los getters y setters de sequelize
function getWeekday(){
  var today = new Date();
  var day = today.getDay();
  var daylist = ["sunday","monday","tuesday","wednesday ","thursday","friday","saturday"];
  return daylist[day]
}

module.exports = (sequelize) => {
  sequelize.define('product', {
    id: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [10]
      },
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      validate: {
        len: [5, 200]
      },
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    images: {
      type: DataTypes.TEXT
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    // todo el frontend solo debe interactuar con la propiedad discount y discounted_price, el backend se encarga del resto
    discount: {
      type: DataTypes.VIRTUAL,
      // este getter devuelve el campo discount que corresponde al día de la semana en que se pide el valor del campo 'discount'
      // sabe que día de la semana es, gracias a la función getWeekday
      get(){
        return this.getDataValue(`discount_${getWeekday()}`)
      },
      // este setter recibe un string compuesto por dos palabras, la primera palabra le dice que campo debe actualizar y la segunda palabra que recibe es el valor que debe asignarle a dicho campo
      // set ("discount_monaday 0") se traduce en 
      // this.setDataValue("discount_monday", 0)
      set(value){
        let realValue = value.split(' ')
        this.setDataValue(realValue[0], realValue[1])
      }
    },
    discounted_price: {
      type: DataTypes.VIRTUAL,
      get(){
        // esta función sabe que día de la semana es, y devuelve el precio descontado, utilizando el descuento que corresponde con el día de la semana.
        return this.getDataValue('price') * ( 100 - this.getDataValue(`discount_${getWeekday()}`)) / 100 
      },
      set(){
        throw new Error ("Don't try to set this field");
      }
    },
    // los siguientes campos son sólo para uso interno, se necesitan para la función de descuentos por día de la semana
    discount_monday: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    discount_tuesday: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    discount_wednesday: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    discount_thursday: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    discount_friday: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    discount_saturday: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    discount_sunday: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
  },{
    timestamps: false
  });
};
