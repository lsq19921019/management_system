import {getIdentify} from '@/service/getData.js'

describe('server api test', ()=>{
	it('expect return true',async () =>{
		let result = await getIdentify();
		expect(result.success).to.equal(true);
	});
});