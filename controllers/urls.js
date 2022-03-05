const Url = require('../models/Url')

const postNewUrl = async (req, res) => {
    const urlCount = await Url.estimatedDocumentCount()
    const oGUrl = req.body.url
    if (urlCount !== 0) {
        const foundUrl = await Url.findOne({ original_url: oGUrl })
        if (foundUrl) {
            console.log('url was already made')
            return res.status(200).json(foundUrl)
        } else {
            const newUrl = await Url.create({
                original_url: oGUrl,
                short_url: urlCount + 1
            })
            console.log('new url added')
            return res.status(201).json({ newUrl })
        }
    }
    const newUrl = await Url.create({
        original_url: oGUrl,
        short_url: urlCount + 1
    })
    console.log('first url made')
    res.status(201).json({ newUrl })
}

module.exports = { postNewUrl }