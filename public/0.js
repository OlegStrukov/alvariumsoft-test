(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Employes.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Employes.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'employes',
  data: function data() {
    return {
      cur_url: null,
      isLoading: false,
      fullPage: true,
      employees: null,
      meta_employees: null,
      msg: 'product-list',
      selected_department: null,
      all_departments: {
        id: 0,
        title: 'All',
        slug: 'all'
      },
      departments: null,
      query: {
        page: 1,
        limit: 10
      },
      query_url: null,
      limits: [10, 25, 50, 100],
      file: null
    };
  },
  created: function created() {
    this.cur_url = this.$route.path;
    this.getDepartments();
  },
  methods: {
    getDepartments: function getDepartments() {
      var _this = this;

      this.axios.get('/api/get-departments').then(function (response) {
        _this.departments = response.data.data;

        _this.departments.splice(0, 0, _this.all_departments);

        _this.setQueryFromUlr();

        _this.getEmployees();
      });
    },
    getEmployees: function getEmployees() {
      var _this2 = this;

      this.isLoading = true;
      this.axios.get('/api/get-employees', {
        params: this.query
      }).then(function (response) {
        _this2.employees = response.data.data;
        _this2.meta_employees = response.data.meta;
        _this2.isLoading = false;
      });
    },
    changePaginate: function changePaginate(page) {
      this.query.page = page;
      this.setQuery();
    },
    changeLimit: function changeLimit(limit) {
      this.query.page = 1;
      this.query.limit = limit;
      this.setQuery();
    },
    selectDepartment: function selectDepartment(department) {
      if (department.id === 0) {
        this.cur_url = '/employes';
      } else {
        this.cur_url = '/employes/' + department.slug;
        this.setDepartment(department.slug);
      }

      this.setQuery();
    },
    setDepartment: function setDepartment(selected_department) {
      var department = selected_department;

      if (this.$route.name === 'employes-department') {
        department = this.$route.params.slug;
      }

      var dep = this.departments.filter(function (obj) {
        return obj.slug === department;
      });
      this.selected_department = dep[0];

      if (department !== 'all') {
        this.$set(this.query, 'department', this.selected_department.id);
      }
    },
    setQueryFromUlr: function setQueryFromUlr() {
      var query = this.$route.query;

      if (Object.keys(query).length !== 0) {
        for (var key in query) {
          this.$set(this.query, key, query[key]);
        }
      }

      this.setDepartment('all');
    },
    setQuery: function setQuery() {
      this.query_url = this.query;
      this.$delete(this.query_url, 'department');
      this.$router.push({
        path: this.cur_url,
        query: this.query_url
      });
      this.setDepartment('all');
      this.getEmployees();
    },
    exportData: function exportData() {
      var _this3 = this;

      this.isLoading = true;
      this.axios.get('/api/export', {
        params: {
          department: this.selected_department.id
        }
      }).then(function (response) {
        _this3.isLoading = false;
        window.open('/xml.xml', '_blank');
      });
    },
    importData: function importData() {
      var _this4 = this;

      if (this.file != null) {
        this.isLoading = true;
        var formData = new FormData();
        formData.append('file', this.file);
        this.axios.post('/api/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          _this4.getDepartments();
        });
      }
    },
    uploadFile: function uploadFile(event) {
      this.file = event.target.files[0];
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Employes.vue?vue&type=template&id=364da64a&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Employes.vue?vue&type=template&id=364da64a& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("loading", {
        attrs: {
          active: _vm.isLoading,
          "can-cancel": false,
          "is-full-page": _vm.fullPage
        },
        on: {
          "update:active": function($event) {
            _vm.isLoading = $event
          }
        }
      }),
      _vm._v(" "),
      _c("h1", [_vm._v("Employes")]),
      _vm._v(" "),
      _c("div", { staticClass: "container" }, [
        _c("p", [_vm._v("Select XML file")]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-11" }, [
            _c("div", { staticClass: "custom-file" }, [
              _c("input", {
                staticClass: "custom-file-input",
                attrs: { type: "file", id: "inputGroupFile01" },
                on: {
                  change: function($event) {
                    return _vm.uploadFile($event)
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "label",
                {
                  staticClass: "custom-file-label",
                  attrs: { for: "inputGroupFile01" }
                },
                [_vm._v("Choose file")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-1" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                class: { disabled: _vm.file == null },
                attrs: { type: "button", disabled: _vm.file == null },
                on: { click: _vm.importData }
              },
              [_vm._v("Import")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("div", { staticClass: "container" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            { staticClass: "col-11" },
            [
              _vm.departments != null
                ? [
                    _c("multiselect", {
                      attrs: {
                        "track-by": "id",
                        label: "title",
                        placeholder: "Select department",
                        options: _vm.departments,
                        searchable: false,
                        "allow-empty": false
                      },
                      on: { select: _vm.selectDepartment },
                      model: {
                        value: _vm.selected_department,
                        callback: function($$v) {
                          _vm.selected_department = $$v
                        },
                        expression: "selected_department"
                      }
                    })
                  ]
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _c("div", { staticClass: "col-1" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-success",
                attrs: { type: "button" },
                on: { click: _vm.exportData }
              },
              [_vm._v("Export")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _vm.employees != null
        ? [
            _c("table", { staticClass: "table table-dark" }, [
              _vm._m(1),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.employees, function(employee) {
                  return _c("tr", [
                    _c("th", { attrs: { scope: "row" } }, [
                      _vm._v(_vm._s(employee.id))
                    ]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(employee.full_name))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(employee.date_of_birth))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(employee.department.title))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(employee.position))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(employee.type_text))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(employee.payment_m))])
                  ])
                }),
                0
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              [
                _c("multiselect", {
                  attrs: {
                    placeholder: "Select limit",
                    options: _vm.limits,
                    searchable: false,
                    "allow-empty": false
                  },
                  on: { select: _vm.changeLimit },
                  model: {
                    value: _vm.query.limit,
                    callback: function($$v) {
                      _vm.$set(_vm.query, "limit", $$v)
                    },
                    expression: "query.limit"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "div",
              [
                _c("paginate", {
                  attrs: {
                    "page-count": _vm.meta_employees.last_page,
                    "click-handler": _vm.changePaginate,
                    "prev-text": "Prev",
                    "next-text": "Next",
                    "container-class": "pagination",
                    "page-class": "page-item",
                    "page-link-class": "page-link",
                    "prev-class": "page-item",
                    "prev-link-class": "page-link",
                    "next-class": "page-item",
                    "next-link-class": "page-link"
                  }
                })
              ],
              1
            )
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col" }, [
        _c("label", { staticClass: "typo__label" }, [
          _vm._v("Select department")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("ID")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Full Name")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Date of Birth")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Department")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Position")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Type")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Payment")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Employes.vue":
/*!*****************************************!*\
  !*** ./resources/js/views/Employes.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Employes_vue_vue_type_template_id_364da64a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Employes.vue?vue&type=template&id=364da64a& */ "./resources/js/views/Employes.vue?vue&type=template&id=364da64a&");
/* harmony import */ var _Employes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Employes.vue?vue&type=script&lang=js& */ "./resources/js/views/Employes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Employes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Employes_vue_vue_type_template_id_364da64a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Employes_vue_vue_type_template_id_364da64a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Employes.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Employes.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/views/Employes.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Employes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Employes.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Employes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Employes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Employes.vue?vue&type=template&id=364da64a&":
/*!************************************************************************!*\
  !*** ./resources/js/views/Employes.vue?vue&type=template&id=364da64a& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Employes_vue_vue_type_template_id_364da64a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Employes.vue?vue&type=template&id=364da64a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Employes.vue?vue&type=template&id=364da64a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Employes_vue_vue_type_template_id_364da64a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Employes_vue_vue_type_template_id_364da64a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);