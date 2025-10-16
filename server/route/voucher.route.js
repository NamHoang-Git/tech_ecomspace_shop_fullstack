import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
    addVoucerController, bulkDeleteVouchersController,
    bulkUpdateVouchersStatusController, deleteVoucherController,
    getAllVoucherController, updateVoucherController,
    getAvailableVouchersController,
    applyVoucherController
} from '../controllers/voucher.controller.js';

const voucherRouter = Router()

voucherRouter.post('/add-voucher', auth, addVoucerController)
voucherRouter.get('/get-all-voucher', getAllVoucherController)
voucherRouter.put('/update-voucher', auth, updateVoucherController)
voucherRouter.delete('/delete-voucher', auth, deleteVoucherController)
voucherRouter.delete('/bulk-delete-vouchers', auth, bulkDeleteVouchersController)
voucherRouter.put('/bulk-update-vouchers-status', auth, bulkUpdateVouchersStatusController)

// Get available vouchers for checkout
voucherRouter.post('/available', getAvailableVouchersController)

// Apply a voucher
voucherRouter.post('/apply', applyVoucherController)

export default voucherRouter
