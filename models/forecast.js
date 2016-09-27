module.exports = function(sequelize, DataTypes) {
    var Forecast = sequelize.define("forecast", {
        height: DataTypes.INTEGER,
        maxTemp: DataTypes.INTEGER,
        lowTemp: DataTypes.INTEGER,
        chillTemp: DataTypes.INTEGER,
        freezingLevel: DataTypes.INTEGER,
        snow: DataTypes.INTEGER,
        rain: DataTypes.INTEGER,
        wind: DataTypes.INTEGER,
        windDir: DataTypes.STRING,
        summary: DataTypes.STRING,
    }, {
        timestamps:  true,
        classMethods: {
            associate: function(models) {
                Forecast.belongsTo(models.mountain, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }

    });
    return Forecast;
}