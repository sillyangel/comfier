import Card from "../models/Card.js";
import cloudinary from "../config/cloudinary.js";

// Get all cards
export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

// Create a new card
export const createCard = async (req, res) => {
  try {
    const { title, description, username, pfp } = req.body;
    if (!req.file) {
      console.log("No file uploaded");
      Card.create({
        title,
        description,
        userId: req.user.id,
        username,
        pfp,
      })
        .then(() => {
          res.status(201).json({ message: "Card created successfully!" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to create card" });
        });
        return;
    }
    console.log("File uploaded");
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "comfi" },
        async (error, result) => {
          if (error) return res.status(500).json("Failed to upload image" + error);

          // Save image
          // url in db
          await Card.create({
            title,
            description,
            imageUrl: result.secure_url,
            publicId: result.public_id,
            userId: req.user.id,
            username,
            pfp,
          });

          res.status(201).json({ message: "Card created successfully!" });
        },
      )
      .end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: "Failed to create card" + err });
  }
};

// Delete a card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    if (card.publicId) {
      await cloudinary.uploader.destroy(card.publicId, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Failed to delete image" });
      });
    }
    await Card.deleteOne(card);
    res.json({ message: "Card removed successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete card" });
  }
};
