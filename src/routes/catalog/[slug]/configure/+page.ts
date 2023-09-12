import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (async ({ parent ,fetch, params }) => {
  const res = await fetch(`http://mete0r.xyz/api/catalog/iteminfo/${params.slug}`)
  const data = await res.json()
  let self = (await parent()).user

  if (data.iteminfo?.Creator != self.userid && self.admin === false){
    throw error(403, 'Forbidden')
  }
  
  if (data.error === false){
    return {
      item: data.iteminfo
    }
  }
  throw error(404, 'Not found');
}) satisfies PageLoad;