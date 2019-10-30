import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './css/elementui.css'
import './css/custom.styl'
import './css/iconfont/iconfont.css'
import './css/app.styl'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import { PageTitle } from 'bird-ui'
import app from './js/app'
import apis from './js/apis'
import Crud from './components/crud'
import ModelInputs from './components/model-inputs'
import ModelFormDialog from './components/model-form-dialog.vue'
import vueEditor from 'vue-editor-interline'
 
Vue.use(vueEditor)
Vue.component('page-title', PageTitle)
Vue.component('crud', Crud)
Vue.component('model-inputs', ModelInputs)
Vue.component('model-form-dialog', ModelFormDialog)
Vue.config.productionTip = false

Vue.use(Viewer, {
  defaultOptions: {
    minWidth: 400,
    minHeight: 200,
    title: false,
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      prev: 1,
      play: {
        show: 1,
        size: 'large',
      },
      next: 1,
      oneToOne: 1,
      reset: 1,
      rotateLeft: 0,
      rotateRight: 0,
      flipHorizontal: 0,
      flipVertical: 0,
    }
  }
})

import {
  Pagination,
  Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  // MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  // ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  // Popover,
  // Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  // Alert,
  // Slider,
  // Icon,
  Row,
  Col,
  Upload,
  Progress,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  ColorPicker,
  // Transfer,
  Container,
  // Header,
  Aside,
  Main,
  // Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
// Vue.use(Autocomplete);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button)
// Vue.use(ButtonGroup);
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
// Vue.use(Popover);
// Vue.use(Tooltip);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
// Vue.use(Alert);
// Vue.use(Slider);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
// Vue.use(Badge);
// Vue.use(Card);
// Vue.use(Rate);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Container);
// Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
// Vue.use(Footer);

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message

Vue.prototype.$_app = app
Vue.prototype.$apis = apis


//每个页面添加按钮权限，暴露当前页面引用
Vue.mixin({
  data() {
    return {btns: []}
  },
  mounted() {
    if (this.$el.classList && this.$el.classList.contains('page')) { //是页面组件
      for (let menuFather of JSON.parse(localStorage.powersList||'[]')) {
        for (let menu of menuFather.children){
          if (menu.menu_name === this.$route.name && menu.children && menu.children.length > 0) {
            this.btns = menu.children.map(d => {  return d.menu_name })
          } 
        }
      }
      window.curPage = this
    }
  }
})
window.vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
