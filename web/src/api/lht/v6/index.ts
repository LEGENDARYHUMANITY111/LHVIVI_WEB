import { get, post } from '@/utils/http';

export const getNftListByCollectId = async (collectId: string, data: any) => {
   return get({}, '/api/lhs/nft/get-nft-list-by-collect-id/' + collectId, data);
};