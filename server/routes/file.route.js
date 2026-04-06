import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { create, deleteFilesOrFolderById, editFilesOrFolder, getFileById, getFilesByRoom } from '../controllers/file.controller.js'
import { createVersion, deleteFileByVersionNumber, getAllFileVersionsById, restoreFileByVersionNumber } from '../controllers/fileVersion.controller.js'

const router = express.Router()

router.post('/create/:roomId', isAuthenticated, create)
router.get('/get-files/:roomId', isAuthenticated, getFilesByRoom) 
router.get('/get-files/:roomId/:fileId', isAuthenticated, getFileById) 
router.patch('/edit', isAuthenticated, editFilesOrFolder) 
router.delete('/delete', isAuthenticated, deleteFilesOrFolderById) 

//File version endpoints

router.post('/create-version/:roomId/:fileId', isAuthenticated, createVersion)
router.get('/all-versions/:fileId', isAuthenticated, getAllFileVersionsById)
router.delete('/delete-version/:roomId/:fileId', isAuthenticated, deleteFileByVersionNumber)
router.patch('/restore/:fileId', isAuthenticated, restoreFileByVersionNumber)

export default router 