const Url = require('../models/Url')
const asyncWrapper = require('../middleware/async')

const postOrFindUrl = asyncWrapper(async (req, res) => {
    const urlCount = await Url.estimatedDocumentCount()
    const oGUrl = req.body.url

    // regex to test if url matches the necessary structure
    if (!/^(https?\:\/\/www\.).+\.\w{2,}/.test(oGUrl)) {
        return res.status(400).json({ error: "invalid url" })
    }

    // if this is not the first url in database
    if (urlCount !== 0) {
        // search for and return existing url
        const foundUrl = await Url.findOne({ original_url: oGUrl })
        if (foundUrl) {
            return res.status(200).json({
                original_url: foundUrl.original_url,
                short_url: foundUrl.short_url
            })
        } else {
            // create new url
            const newUrl = await Url.create({
                original_url: oGUrl,
                short_url: urlCount + 1
            })
            return res.status(201).json({ 
                original_url: newUrl.original_url,
                short_url: newUrl.short_url
            })
        }
    }

    // add first url in database
    const newUrl = await Url.create({
        original_url: oGUrl,
        short_url: urlCount + 1
    })
    res.status(201).json({ 
        original_url: newUrl.original_url,
        short_url: newUrl.short_url
    })
})

const goToUrl = asyncWrapper (async (req, res) => {
    const { id: shortUrlId } = req.params
    const url = await Url.findOne({ short_url: shortUrlId })
    // checks if url id is valid
    if (!url) {
        return res.status(404).json({ msg: "There is no url associated with that id." })
    }
    res.redirect(`${url.original_url}`)
})

module.exports = { postOrFindUrl, goToUrl }