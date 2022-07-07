import Router from '@koa/router';
import fetch from 'node-fetch';

const router = new Router();
router.prefix('/api/courses');


const fetchBvPlaylist = (
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

export const getBvLessons = async (bvid: string) => {
  const list = await fetchBvPlaylist(bvid);
  console.log(list);

  return list.map((item, i) => ({
    cid: item.cid,
    title: item.part,
    url: `https://www.bilibili.com/video/${bvid}?p=${i + 1}`,
  }));
};


router.get('/:bvid/lessons', async (ctx, next) => {
  const res = await getBvLessons(ctx.params.bvid);

  ctx.body = res;
  next();
});


export default router;
