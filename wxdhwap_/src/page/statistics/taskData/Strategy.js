class Strategy{
	constructor(obj){
		switch(obj.type) {
			case "all":
				this.strategy = new allStrategy(obj.pageIndex, obj.pageSize)
				break
			case "time":
				this.strategy = new timeStrategy(obj.startTime, obj.endTime, obj.pageIndex, obj.pageSize)
				break
			default:
				this.strategy = new allStrategy(obj.pageIndex, obj.pageSize)
		}
	}

	ContextInterface(){
		return this.strategy.AlgorithmInterface();
	}
}

class interfaceStrategy{
	constructor() {
	}
	AlgorithmInterface(){
	}
}

class allStrategy extends interfaceStrategy{
	constructor(pageIndex, pageSize) {
		super()
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}
	AlgorithmInterface (){
		let obj = {
			level: 1,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize
		};
		console.log(1231, obj)
		return obj;
	}
}

class timeStrategy extends interfaceStrategy{
	constructor(startTime, endTime, pageIndex, pageSize) {
		super()
		this.startTime = startTime;
		this.endTime = endTime;
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}
	AlgorithmInterface (){
		let obj = {
			startTime: this.startTime,
			level: 1,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			endTime: this.endTime
		};
		return obj;
	}
}

export default Strategy