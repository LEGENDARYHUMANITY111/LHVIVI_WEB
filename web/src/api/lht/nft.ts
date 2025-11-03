import { get, post } from '@/utils/http';

export const getNftDetail = async (data) => {
   return get({}, '/api/lhs/nft/get-detail', data);
};

export const getHomeCategoryNft = async (data) => {
   return get({}, '/api/lhs/nft/get-category-nft-home', data);
};

//getCarouselPayNft
export const getNftAds = async (data) => {
   return get({}, '/api/lhs/nft/get-nft-ads', data);
};

export const getNftCommissionPage = async (data: any) => {
   return get({}, '/api/lhs/nft/get-nft-commission', data);
};

export const getNftOrderPage = async (data: any) => {
   return get({}, '/api/lhs/nft/get-nft-order', data);
};

export const getMyTokens = async (data: any) => {
   return get({}, '/api/lhs/nft/get-my-tokens', data);
};

export const getNftTokenValues = async (data: any) => {
   return get({}, '/api/lhs/nft/get-token-values', data);
};

export const getMyMintedNftPages = async (data: any) => {
   return get({}, '/api/lhs/nft/get-my-minted-pages', data);
};

export const getAbsNftPages = async (data: any) => {
   return get({}, '/api/lhs/user/get-abstract-nfts', data);
};

export const fetchAbsNftPages = async (data: any) => {
   return post({}, '/api/lhs/user/fetch-abstract-nfts', data);
};

export const getSolUsdt = async () => {
   return get({}, 'https://api.coingecko.com/api/v3/simple/price?ids=solana,tether&vs_currencies=usd');
};

export const getBatchMintNftsByCid = async (data: any) => {
   return get({}, '/api/lhs/nft/get-batch-nfts-by-cid', data);
};

export const createMintOrderV2 = async (data) => {
   return post({}, '/api/lhs/nft/create-order-v2', data);
};

export const getCollections = async (data: any) => {
   return get({}, '/api/lhs/nft/get-collections', data);
}


export const getArtNftList = async (data) => {
   return get({}, '/api/lhs/artn-ft/lists', data);
};

export const getArtNftInfo = async (id, data: any) => {
   return get({}, '/api/lhs/artn-ft/info/' + id, data);
};

export const getMintArtNft = async (id, data: any) => {
   return get({}, '/api/lhs/artn-ft/get-mint-nfts/' + id, data);
};



export const getArtNftFilterList = async (data) => {
   return get({}, '/api/lhs/get-nft-filter-list', data);
};

export const getArtNftListV6 = async (data) => {
   return get({}, '/api/lhs/artn-ft/lists-v6', data);
};

export const redeemNft = async (data) => {
   return post({}, '/api/lhs/nft/redeem', data);
};