const validation = (Schema: any) => (req: any, res: any, next: any) => {
  const { error } = Schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

export default validation;
