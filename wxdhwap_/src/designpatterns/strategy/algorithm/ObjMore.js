import ObjStrategy from './ObjStrategy';

class ObjMore extends ObjStrategy {
	productObj(parm) {
		if(!parm && !parm.startTime && !parm.pageIndex && parm.endTime && parm.pageSize) return;
		let obj = {
			startTime: parm.startTime,
			level: 1,
			pageIndex: parm.pageIndex,
			pageSize: parm.pageSize,
			endTime: parm.endTime
		};
		return obj;
	}
}

export default ObjMore;