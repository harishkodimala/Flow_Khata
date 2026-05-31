catch (error) {

  console.error(
    "SEND STATEMENT ERROR:",
    error
  );

  res.status(500).json({

    message:
      error.message

  });

}