import Router from '@koa/router';
import { getBvLessons, getMediaList, getTlist } from './utils/dataFormatter';

const router = new Router();
router.prefix('/api/courses');

router.get('/:bvid/lessons', async (ctx, next) => {
  const res = await getBvLessons(ctx.params.bvid);

  ctx.body = res;
  next();
});

router.get('/media_list/:mid', async (ctx, next) => {
  const res = await getMediaList(ctx.params.mid, ctx.request.query.tid as string);

  ctx.body = res;
  next();
});

router.get('/media_list/:mid/t_list', async (ctx, next) => {
  const res = await getTlist(ctx.params.mid);

  ctx.body = res;
  next();
});

export default router;
