db.collection("app-libri-gustavo")
  .get()
  .then((snepshot) => {
    snepshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });
