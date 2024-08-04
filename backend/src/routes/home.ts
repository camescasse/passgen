import Router from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.send('Thanks for using Passgen!');
});

export default router;
