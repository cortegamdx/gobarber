module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })
  Appointment.associate = models => {
    // usuário
    Appointment.belongsTo(models.User, { foreignKey: 'user_id' })
    // prestador de serviço
    Appointment.belongsTo(models.User, { foreignKey: 'provider_id' })
  }
  // comando para criar a migration
  // npx sequelize migration:create --name=create-appointments
  return Appointment
}
