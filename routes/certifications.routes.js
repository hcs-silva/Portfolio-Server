const router = require("express").Router();
const CertificationsModel = require("../models/Certifications.model")

router.get("/", async (req, res) => {
    try {
        const foundCertifications = await CertificationsModel.find();
        res.status(200).json({message: "Here are Your Certifications", foundCertifications})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Here is the Error", error })
    }
})

router.post("/", async (req, res) => {
    try {
        
        const certificationToAdd = {
            title: req.body.title,
            provider: req.body.provider,
            certificationLink: req.body.certificationLink,
            aquiredAt: req.body.aquiredAt
        }

        console.log(req.body)

        const addedCertification = await CertificationsModel.create(certificationToAdd);
        res.status(201).json({message: "Certification Added", addedCertification})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Here is the Error", error })
    }
})

router.get("/:certificationId", async (req, res) => {
    const {certificationId} = req.params
    try {
        const oneCertification = await CertificationsModel.findById(certificationId);

        res.status(200).json({message: "Here is the Certification", oneCertification})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Here is the Error", error })
    }
})

module.exports = router;