<ons-page modifier="material" ng-controller="ItemsController as vm">
  <ons-toolbar modifier="material">
    <div class="left">
      <ons-toolbar-button modifier="material" ng-click="globals.nav.popPage()">
        <i class="fa fa-arrow-left"></i>
        <ons-ripple color="rgba(0, 150, 136, 0.1)"></ons-ripple>
      </ons-toolbar-button>
    </div>
    <div class="center">Shop</div>
    <div class="right">
      <ons-toolbar-button ng-click="globals.menu.open()" modifier="material">
        <i class="fa fa-cogs"></i>
      </ons-toolbar-button>
      <ons-toolbar-button ng-click="vm.goCart()" modifier="material">
        <i ng-show="vm.cart.items.length>0" class="qd-icon icon-cartvide-1"></i>
        <i ng-show="vm.cart.items.length==0" class="fa fa-shopping-cart"></i>
      </ons-toolbar-button>
    </div>
  </ons-toolbar>

  <ons-list modifier="material subcats">
    <ons-list-header modifier="material">Categories</ons-list-header>
    <ons-list-item ng-click="vm.select({{item}})" modifier="material" ng-repeat="item in vm.items">
      <label>
        {{item.price | currency}}
        <i class="qd-icon {{item.icon}}"></i>
      </label>
      <span class="cat-title">{{item.label}}</span>
      <div class="price" ng-if="vm.cart.q(item)>0">{{vm.cart.q(item)}}</div>
      <ons-ripple color="rgba(0, 150, 136, 0.1)"></ons-ripple>

    </ons-list-item>
    
  </ons-list>

  <ons-bottom-toolbar>
      <ons-button ng-click="vm.goCart()" modifier="material--flat large">
      COMPLETE ORDER
      <ons-ripple color="rgba(0, 150, 136, 0.1)"></ons-ripple>
    </ons-button>
  </ons-bottom-toolbar>
  <!-- <ons-fab position="bottom right" ng-click="todo.newTodo()">
    <ons-ripple color="rgba(255, 255, 255, 0.2)"></ons-ripple>
    <ons-icon icon="md-plus" size="24px" style="line-height: 56px;"></ons-icon>
  </ons-fab> -->
</ons-page>