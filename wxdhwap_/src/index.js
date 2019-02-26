import charts from '@/components/charts/charts';
import model from '@/components/modelRender/';

const version = '1.0.0';

const install = function(Vue, config = {}){
	if(install.installed) return;

	Vue.component(charts.name, charts);
	Vue.component(model.name, model);
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default install;