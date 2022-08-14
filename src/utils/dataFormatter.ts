import { fetchBvPlaylist, fetchMediaList } from "./request";

export const getBvLessons = async (bvid: string) => {
  const list = await fetchBvPlaylist(bvid);

  return list.map((item, i) => ({
    id: item.cid,
    title: item.part,
    url: `https://www.bilibili.com/video/${bvid}?p=${i + 1}`,
  }));
};


export const getMediaList = async (mid: string, tid: string) => {
  let pageIndex = 0;
  let res = [];
  let flag = true;

  while (flag) {
    const { list, has_more } = await fetchMediaList(mid, tid, pageIndex + 1);

    res[pageIndex] = list;
    flag = has_more;
    pageIndex += 1;
  }

  
  return res.reduce((res, list) => {
    res = [...res, ...list];
    return res;
  }, []).map((item) => ({
    id: item.bvid,
    title: item.title,
    url: `https://www.bilibili.com/video/${item.bvid}`,
  }));
};

export const getTlist = async (mid: string) => {
  const { tlist } = await fetchMediaList(mid, '0', 1, 1);
  
  return Object.keys(tlist).reduce((res, key) => {
    res = [...res, tlist[key as keyof typeof tlist]];

    return res;
  }, []);
};