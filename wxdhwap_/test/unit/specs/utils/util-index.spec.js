import {typeOf} from '@/utils/index.js'

describe('typeOf', ()=>{
	it('I want to get a type of Array', () =>{
		expect(typeOf([1,3])).to.equal('array');
	});
});