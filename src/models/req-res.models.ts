interface PlayerRegistrationRequest {
  type: 'reg';
  data: {
    name: string;
    password: string;
  };
  id: number;
}

interface PlayerRegistrationResponse {
  type: 'reg';
  data: {
    name: string;
    index: number | string;
    error: boolean;
    errorText: string;
  };
  id: number;
}
interface UpdateWinnersResponse {
  type: 'update_winners';
  data: Array<{
    name: string;
    wins: number;
  }>;
  id: number;
}
interface CreateRoomRequest {
  type: 'create_room';
  data: string; // пустая строка
  id: number;
}

interface AddUserToRoomRequest {
  type: 'add_user_to_room';
  data: {
    indexRoom: number | string;
  };
  id: number;
}

interface CreateGameResponse {
  type: 'create_game';
  data: {
    idGame: number | string;
    idPlayer: number | string;
  };
  id: number;
}

interface UpdateRoomResponse {
  type: 'update_room';
  data: Array<{
    roomId: number | string;
    roomUsers: Array<{
      name: string;
      index: number | string;
    }>;
  }>;
  id: number;
}
interface AddShipsRequest {
  type: 'add_ships';
  data: {
    gameId: number | string;
    ships: Array<{
      position: {
        x: number;
        y: number;
      };
      direction: boolean; // true - вертикально, false - горизонтально
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }>;
    indexPlayer: number | string;
  };
  id: number;
}
interface StartGameResponse {
  type: 'start_game';
  data: {
    ships: Array<{
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }>;
    currentPlayerIndex: number | string;
  };
  id: number;
}
interface AttackRequest {
  type: 'attack';
  data: {
    gameId: number | string;
    x: number;
    y: number;
    indexPlayer: number | string;
  };
  id: number;
}

interface AttackResponse {
  type: 'attack';
  data: {
    position: {
      x: number;
      y: number;
    };
    currentPlayer: number | string;
    status: 'miss' | 'killed' | 'shot';
  };
  id: number;
}
interface RandomAttackRequest {
  type: 'randomAttack';
  data: {
    gameId: number | string;
    indexPlayer: number | string;
  };
  id: number;
}
interface TurnResponse {
  type: 'turn';
  data: {
    currentPlayer: number | string;
  };
  id: number;
}
interface FinishGameResponse {
  type: 'finish';
  data: {
    winPlayer: number | string;
  };
  id: number;
}
