module.exports = function(sequelize, DataTypes) {
    var Mountain = sequelize.define("mountain", {
        name:         DataTypes.STRING,
        country:    DataTypes.STRING,
        height: DataTypes.INTEGER,
    }, {
        timestamps:  true,
        classMethods: {
            associate: function(models) {
                Mountain.hasMany(models.forecast)
            }
        }
    });
    return Mountain;
}