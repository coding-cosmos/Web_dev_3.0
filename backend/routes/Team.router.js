import express from 'express';
import { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam,leaveTeam, updateKitProvided } from '../controllers/Team.controller.js';
import { verifyJwt } from '../middlewares/auth.middlewares.js';


const teamRouter = express.Router();

teamRouter.get('/', verifyJwt, getAllTeams);
teamRouter.get('/:teamId', verifyJwt, getTeamById);
teamRouter.post('/', verifyJwt, createTeam);
teamRouter.put('/:teamId/', verifyJwt, updateTeam);
teamRouter.delete('/:teamId', verifyJwt, deleteTeam);
teamRouter.put("/:teamId/leave", verifyJwt, leaveTeam);
teamRouter.put("/:teamId/:isKitProvided", verifyJwt, updateKitProvided);



export default teamRouter;
