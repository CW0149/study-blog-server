import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

export const fetchBvPlaylist = (
  bvid: string
): Promise<
  {
    part: string;
    cid: number;
  }[]
> => {
  return fetch(
    `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}&jsonp=jsonp`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  )
    .then((res) => res.json())
    .then((rawData) => rawData.data);
};

export const fetchMediaList = (mid: string, tid: string, pn: number = 1, ps: number = 50): Promise<{ list: {bv_id: string; id: number; title: string;}[]; has_more: boolean; tlist: Record<string, { tid: string, name: string }> }> => {
  const params = new URLSearchParams({
    ps: String(ps),
    pn: String(pn),
    mid,
    tid,
  });

  return fetch(
    `https://api.bilibili.com/x/space/arc/search?${params}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  ).then((res) => res.json()).then(({ data }) => {
    const { list, page } = data;
    const { pn, ps, count } = page;

    return {
      list: list.vlist ?? [],
      has_more: pn * ps < count,
      tlist: list.tlist, 
    };
  });
};