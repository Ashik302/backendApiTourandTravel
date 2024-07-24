import express from "express";
import Package from "../models/packages.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const packages = req.body;

    if (!Array.isArray(packages)) {
        return res.status(400).json({ message: "Request body should be an array of package objects" });
    }

    try {
        // Iterate through each package to either update or insert
        const result = await Promise.all(packages.map(async (pkg) => {
            const existingPackage = await Package.findOne({ id: pkg.id }); // Assuming 'id' is the unique identifier

            if (existingPackage) {
                // Update existing package
                return Package.findByIdAndUpdate(
                    existingPackage._id,
                    { $set: pkg },
                    { new: true }
                );
            } else {
                // Insert new package
                return Package.create(pkg);
            }
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to process packages', error });
    }
});



router.get('/', async (req, res) => {
    try {
        const packag = await Package.find()
        res.status(200).json(packag)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const packag = await Package.findById(req.params.id)
        res.status(200).json(packag)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;