class Algorithm{
	constructor(obj){
		this.objStrategy = null;
	}
    setProductObj(objStrategy){
    	this.objStrategy = objStrategy;
    }
    productObj(parm){
		this.objStrategy.productObj(parm);
    }
}

export default Algorithm;