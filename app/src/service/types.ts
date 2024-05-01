export interface VideoList {
  items: Video[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface Video {
  availableResolutions: string; // "360p,480p,720p,240p"
  averageWatchTime: number;
  captions: any[];
  category: string;
  chapters: any[];
  collectionId: string;
  dateUploaded: string;
  encodeProgress: number;
  framerate: number;
  guid: string;
  hasMP4Fallback: boolean;
  height: number;
  isPublic: boolean;
  length: number;
  metaTags: any[];
  moments: any[];
  rotation: number;
  status: number;
  storageSize: number;
  thumbnailCount: number;
  thumbnailFileName: string;
  title: string;
  totalWatchTime: number;
  transcodingMessages: any[];
  videoLibraryId: number;
  views: number;
  width: number;
  thumbnail: string;
  preview: string;
  playedSeconds?: number;
  doneWatching?: boolean;
  continueWatching?: boolean;
  infoId?: string;
  updatedAt?: number;
}

export interface VideoLibrary {
  AllowDirectPlay: boolean;
  AllowEarlyPlay: boolean;
  AllowedReferrers: any[];
  ApiAccessKey: null;
  ApiKey: string;
  AppleFairPlayDrm: {
    Enabled: boolean;
    CertificateId: null;
    CertificateExpirationDate: null;
    Provider: null;
  };
  Bitrate240p: number;
  Bitrate360p: number;
  Bitrate480p: number;
  Bitrate720p: number;
  Bitrate1080p: number;
  Bitrate1440p: number;
  Bitrate2160p: number;
  BlockNoneReferrer: boolean;
  BlockedReferrers: any[];
  CaptionsBackground: string;
  CaptionsFontColor: string;
  CaptionsFontSize: number;
  Controls: string;
  CustomHTML: null;
  DateCreated: string;
  DrmVersion: number;
  EnableContentTagging: boolean;
  EnableDRM: boolean;
  EnableMP4Fallback: boolean;
  EnableTranscribing: boolean;
  EnableTranscribingDescriptionGeneration: boolean;
  EnableTranscribingTitleGeneration: boolean;
  EnabledResolutions: string;
  FontFamily: string;
  GoogleWidevineDrm: {
    Enabled: boolean;
    CertificateId: null;
    CertificateExpirationDate: null;
    Provider: null;
    SdOnlyForL3: boolean;
  };
  HasWatermark: boolean;
  Id: number;
  KeepOriginalFiles: boolean;
  Name: string;
  PlayerKeyColor: string;
  PlayerTokenAuthenticationEnabled: boolean;
  PullZoneId: number;
  PullZoneType: number;
  ReadOnlyApiKey: string;
  RememberPlayerPosition: boolean;
  ReplicationRegions: string[];
  ShowHeatmap: boolean;
  StorageUsage: number;
  StorageZoneId: number;
  TrafficUsage: number;
  TranscribingCaptionLanguages: any[];
  UILanguage: string;
  VastTagUrl: null;
  ViAiPublisherId: null;
  VideoCount: number;
  WatermarkHeight: number;
  WatermarkPositionLeft: number;
  WatermarkPositionTop: number;
  WatermarkVersion: number;
  WatermarkWidth: number;
  WebhookUrl: null;
}
