const { Router } = require('./router');
const medicinesController = require('../controllers/medicinesController');

const router = new Router();

router.get('/', medicinesController.getAllMedicines);
router.get('/:id', medicinesController.getMedicineById);
router.post('/', medicinesController.createMedicine);
router.put('/:id', medicinesController.updateMedicine);
router.patch('/:id', medicinesController.partialUpdateMedicine);
router.delete('/:id', medicinesController.deleteMedicine);

module.exports = router;