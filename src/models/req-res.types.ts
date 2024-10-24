import {
  PlayerRegistrationRequest,
  CreateRoomRequest,
  AddUserToRoomRequest,
  AddShipsRequest,
  AttackRequest,
  RandomAttackRequest,
  PlayerRegistrationResponse,
  CreateGameResponse,
  UpdateRoomResponse,
  StartGameResponse,
  AttackResponse,
  TurnResponse,
  FinishGameResponse,
  UpdateWinnersResponse,
} from './req-res.interfaces';

export type WebSocketRequest =
  | PlayerRegistrationRequest
  | CreateRoomRequest
  | AddUserToRoomRequest
  | AddShipsRequest
  | AttackRequest
  | RandomAttackRequest;

export type WebSocketResponse =
  | PlayerRegistrationResponse
  | CreateGameResponse
  | UpdateRoomResponse
  | StartGameResponse
  | AttackResponse
  | TurnResponse
  | FinishGameResponse
  | UpdateWinnersResponse;
