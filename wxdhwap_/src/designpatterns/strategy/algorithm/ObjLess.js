import ObjStrategy from './ObjStrategy';

class ObjLess extends ObjStrategy {
	productObj(parm) {
		if(!parm && !parm.pageIndex && parm.pageSize) return;
		let obj = {
			level: 1,
			pageIndex: parm.pageIndex,
			pageSize: parm.pageSize
		};
		return obj;
	}
}

export default ObjLess;