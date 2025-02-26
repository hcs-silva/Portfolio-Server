const { Schema, model } = require("mongoose");

const certificationSchema = new Schema({
    title: {type: String, required: true},
    provider: {type: String, required: true},
    certificationLink: {type: String, required: true},
    aquiredAt: {type: Date}
})

const CertificationsModel = model("Certification", certificationSchema)
module.exports = CertificationsModel;