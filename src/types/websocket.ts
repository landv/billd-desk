import {
  DanmuMsgTypeEnum,
  ILiveUser,
  WsMessageMsgIsFileEnum,
} from '@/interface';
import { ILiveRoom, LiveRoomTypeEnum } from '@/types/ILiveRoom';
import { IUser } from '@/types/IUser';

/** websocket连接状态 */
export enum WsConnectStatusEnum {
  /** 已连接 */
  connection = 'connection',
  /** 连接中 */
  connecting = 'connecting',
  /** 已连接 */
  connected = 'connected',
  /** 断开连接中 */
  disconnecting = 'disconnecting',
  /** 已断开连接 */
  disconnect = 'disconnect',
  /** 重新连接 */
  reconnect = 'reconnect',
  /** 客户端的已连接 */
  connect = 'connect',
}

/** websocket消息类型 */
export enum WsMsgTypeEnum {
  /** 用户进入聊天 */
  join = 'join',
  /** 用户进入聊天完成 */
  joined = 'joined',
  /** 用户进入聊天 */
  otherJoin = 'otherJoin',
  /** 用户退出聊天 */
  leave = 'leave',
  /** 用户退出聊天完成 */
  leaved = 'leaved',
  /** 当前所有在线用户 */
  liveUser = 'liveUser',
  /** 用户发送消息 */
  message = 'message',
  /** 房间正在直播 */
  roomLiving = 'roomLiving',
  /** 房间不在直播 */
  roomNoLive = 'roomNoLive',
  /** 获取在线用户 */
  getLiveUser = 'getLiveUser',
  /** 更新加入信息 */
  updateJoinInfo = 'updateJoinInfo',
  /** 更新直播间预览图 */
  updateLiveRoomCoverImg = 'updateLiveRoomCoverImg',
  /** 心跳 */
  heartbeat = 'heartbeat',
  /** 开始直播 */
  startLive = 'startLive',
  /** 结束直播 */
  endLive = 'endLive',
  /** 直播pk秘钥 */
  livePkKey = 'livePkKey',
  /** 主播禁言用户 */
  disableSpeaking = 'disableSpeaking',
  /** 主播踢掉用户 */
  kick = 'kick',

  srsOffer = 'srsOffer',
  srsAnswer = 'srsAnswer',
  srsCandidate = 'srsCandidate',

  nativeWebRtcOffer = 'nativeWebRtcOffer',
  nativeWebRtcAnswer = 'nativeWebRtcAnswer',
  nativeWebRtcCandidate = 'nativeWebRtcCandidate',

  msrBlob = 'msrBlob',
  batchSendOffer = 'batchSendOffer',
  fileTransfer = 'fileTransfer',

  changeMaxBitrate = 'changeMaxBitrate',
  changeMaxFramerate = 'changeMaxFramerate',
  changeResolutionRatio = 'changeResolutionRatio',
  changeVideoContentHint = 'changeVideoContentHint',
  changeAudioContentHint = 'changeAudioContentHint',

  billdDeskJoin = 'billdDeskJoin',
  billdDeskJoined = 'billdDeskJoined',
  billdDeskUpdateUser = 'billdDeskUpdateUser',
  billdDeskStartRemote = 'billdDeskStartRemote',
  billdDeskStartRemoteResult = 'billdDeskStartRemoteResult',
  billdDeskBehavior = 'billdDeskBehavior',
  billdDeskOffer = 'billdDeskOffer',
  billdDeskAnswer = 'billdDeskAnswer',
  billdDeskCandidate = 'billdDeskCandidate',
}

/** 发送消息统一格式 */
export interface IReqWsFormat<T> {
  /** 消息id */
  request_id: string;
  /** 用户socket_id */
  socket_id: string;
  /** 用户信息 */
  user_info?: IUser;
  /** 用户token */
  user_token?: string;
  /** 消息时间戳 */
  time: number;
  data: T;
}

/** 接收消息统一格式 */
export interface IResWsFormat<T> {
  /** 消息id */
  request_id: string;
  /** 消息时间戳 */
  time: number;
  data: T;
}

export interface IWsFormat<T> {
  /** 消息id */
  request_id: string;
  /** 用户socket_id */
  socket_id: string;
  /** 是否是主播 */
  is_anchor: boolean;
  /** 用户信息 */
  user_info?: IUser;
  /** 用户token */
  user_token?: string;
  data: T;
}

export type WsChangeMaxBitrateType = IWsFormat<{
  live_room_id: number | string;
  val: number;
}>;

export type WsChangeMaxFramerateType = IWsFormat<{
  live_room_id: number | string;
  val: number;
}>;

export type WsChangeResolutionRatioType = IWsFormat<{
  live_room_id: number | string;
  val: number;
}>;

export type WsChangeVideoContentHintType = IWsFormat<{
  live_room_id: number | string;
  val: string;
}>;

export type WsChangeAudioContentHintType = IWsFormat<{
  live_room_id: number | string;
  val: string;
}>;

export type WsUpdateJoinInfoType = IWsFormat<{
  live_room_id: number;
  track?: { audio: number; video: number };
}>;

/** 直播pk秘钥 */
export type WSLivePkKeyType = IWsFormat<{
  live_room_id: number;
  key: string;
}>;

/** 获取在线用户 */
export type WSGetRoomAllUserType = IWsFormat<{
  liveUser: ILiveUser[];
}>;

/** 获取在线用户 */
export type WsGetLiveUserType = IWsFormat<{
  live_room_id: number;
}>;

/** 直播间正在直播 */
export type WsRoomLivingType = IWsFormat<{
  live_room: ILiveRoom;
  anchor_socket_id: string;
  socket_list?: string[];
}>;

/** 直播间没在直播 */
export type WsRoomNoLiveType = IWsFormat<{
  live_room: ILiveRoom;
}>;

export interface IDanmu {
  msgType: DanmuMsgTypeEnum;
  msgIsFile: WsMessageMsgIsFileEnum;
  msg: string;
  username?: string;
  user_agent?: string;
  send_msg_time: number;
  live_room_id: number;
  redbag_send_id?: number;
  msg_id?: number;

  socket_id: string;
  request_id?: string;
  userInfo?: IUser;
}

/** ws消息 */
export type WsMessageType = IWsFormat<IDanmu>;

/** 禁言用户 */
export type WsDisableSpeakingType = IWsFormat<{
  request_id?: string;
  /** 被禁言用户socket_id */
  socket_id: string;
  /** 被禁言用户id */
  user_id: number;
  /** 直播间id */
  live_room_id: number;
  /** 禁言时长（单位：秒） */
  duration?: number;
  /** 禁言创建消息 */
  disable_created_at?: number;
  /** 禁言到期消息 */
  disable_expired_at?: number;
  /** 禁言成功 */
  disable_ok?: boolean;
  /** 解除禁言成功 */
  restore_disable_ok?: boolean;
  /** 是否正在禁言 */
  is_disable_speaking?: boolean;
  /** 是否解除禁言 */
  restore?: boolean;
}>;

/** 其他用户加入直播间 */
export type WsOtherJoinType = IWsFormat<{
  live_room: ILiveRoom;
  live_room_user_info: IUser;
  join_user_info?: IUser;
  join_socket_id: string;
  socket_list: string[];
}>;

/** 开始直播 */
export type WsStartLiveType = IWsFormat<{
  name: string;
  type: LiveRoomTypeEnum;
  /** 单位：毫秒 */
  msrDelay: number;
  /** 单位：毫秒 */
  msrMaxDelay: number;
}>;

/** 更新直播间预览图 */
export type WsUpdateLiveRoomCoverImg = IWsFormat<{
  cover_img: string;
}>;

/** 用户加入直播间 */
export type WsJoinType = IWsFormat<{
  socket_id: string;
  live_room_id: number;
  live_room?: ILiveRoom;
  anchor_info?: IUser;
  user_info?: IUser;
  isRemoteDesk?: boolean;
  socket_list?: string[];
  deskUserUuid?: string;
  deskUserPassword?: string;
  remoteDeskUserUuid?: string;
  receiver?: string;
}>;

/** 用户离开直播间 */
export type WsLeavedType = IWsFormat<{
  socket_id: string;
  user_info?: IUser;
}>;

/** 心跳检测 */
export type WsHeartbeatType = IReqWsFormat<{
  live_room_id: number;
}>;

/** msr直播发送blob */
export type WsMsrBlobType = IWsFormat<{
  live_room_id: number;
  blob: any;
  blob_id: string;
  /** 单位：毫秒 */
  delay: number;
  /** 单位：毫秒 */
  max_delay: number;
}>;

export type WsOfferType = IReqWsFormat<{
  live_room: ILiveRoom;
  sdp: any;
  sender: string;
  receiver: string;
  live_room_id: number | string;
  isRemoteDesk?: boolean;
}>;

export type WsAnswerType = IReqWsFormat<{
  sdp: any;
  sender: string;
  receiver: string;
  live_room_id: number | string;
}>;

export type WsCandidateType = IReqWsFormat<{
  live_room_id: number | string;
  candidate: RTCIceCandidate;
  receiver: string;
  sender: string;
}>;

// ==========

export enum BilldDeskBehaviorEnum {
  mouseMove,
  mouseDrag,
  pressButtonLeft,
  pressButtonRight,
  releaseButtonLeft,
  releaseButtonRight,
  setPosition,
  doubleClick,
  leftClick,
  rightClick,
  scrollDown,
  scrollUp,
  scrollLeft,
  scrollRight,

  keyboardType,
  keyboardPressKey,
  keyboardReleaseKey,
}

export type WsBilldDeskStartRemote = IReqWsFormat<{
  sender: string;
  receiver: string;
  roomId: string;
  maxBitrate: number;
  maxFramerate: number;
  resolutionRatio: number;
  audioContentHint: string;
  videoContentHint: string;
  deskUserUuid: string;
  deskUserPassword: string;
  remoteDeskUserUuid: string;
  remoteDeskUserPassword: string;
}>;

export type WsBilldDeskBehaviorType = IReqWsFormat<{
  roomId: string;
  sender: string;
  receiver: string;
  type: BilldDeskBehaviorEnum;
  x: number;
  y: number;
  amount: number;
  key: string[] | number[];
}>;

/** 用户加入直播间 */
export type WsBilldDeskJoinType = IReqWsFormat<{
  deskUserUuid: string;
  deskUserPassword: string;
  live_room_id: string;
}>;

/** 用户加入直播间 */
export type WsBilldDeskJoinedType = IResWsFormat<{
  live_room_id?: string;
}>;

export type WsBilldDeskStartRemoteResult = IResWsFormat<{
  code: number;
  msg: string;
  data?: WsBilldDeskStartRemote['data'];
}>;
