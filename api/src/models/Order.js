const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'processing', 'complete', 'canceled'),
            defaultValue:'pending',
            allowNull: false
        },
        payment_status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'canceled'),
            defaultValue:'pending',
            allowNull: false
        },
        notification_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_link: {
            type: DataTypes.TEXT,
        },
        payment_meli_id: {
            type: DataTypes.INTEGER,
        },
        // cuando le pedimos la fecha, la entrega formateada en dia/mes/año y en hora argentina, se calcula apartir del createdAt timestamp
        date: {
            type: DataTypes.VIRTUAL,
            get(){
                return this.getDataValue('createdAt').toLocaleString('en-GB', {timeZone: 'America/Buenos_Aires'})
            },
            set(value){
                throw new Error('Do not try to set the "date" value!');
            }
        }

    },{
        timestamps: true,
        updatedAt: false,
        
    })
}
