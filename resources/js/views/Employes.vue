<template>
    <div>

        <loading :active.sync="isLoading"
                 :can-cancel="false"
                 :is-full-page="fullPage"></loading>

        <h1>Employes</h1>

        <div class="container">
            <p>Select XML file</p>
            <div class="row">
                <div class="col-11">
                    <div class="custom-file">
                        <input @change="uploadFile($event)" type="file" class="custom-file-input" id="inputGroupFile01">
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>
                <div class="col-1">
                    <button type="button" :class="{ disabled : file == null }" :disabled="file == null" @click="importData" class="btn btn-primary">Import</button>
                </div>
            </div>
        </div>
        <br>

        <div class="container">
            <div class="row">
                <div class="col">
                    <label class="typo__label">Select department</label>
                </div>
            </div>
            <div class="row">
                <div class="col-11">
                    <template v-if="departments != null">
                        <multiselect
                            v-model="selected_department"
                            track-by="id"
                            label="title"
                            placeholder="Select department"
                            :options="departments"
                            :searchable="false"
                            :allow-empty="false"
                            @select="selectDepartment">
                        </multiselect>
                    </template>
                </div>
                <div class="col-1">
                    <button type="button" @click="exportData" class="btn btn-success">Export</button>
                </div>
            </div>
        </div>
        <br>
        <template v-if="employees != null">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Department</th>
                        <th scope="col">Position</th>
                        <th scope="col">Type</th>
                        <th scope="col">Payment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in employees">
                        <th scope="row">{{ employee.id }}</th>
                        <td>{{ employee.full_name }}</td>
                        <td>{{ employee.date_of_birth }}</td>
                        <td>{{ employee.department.title }}</td>
                        <td>{{ employee.position }}</td>
                        <td>{{ employee.type_text }}</td>
                        <td>{{ employee.payment_m }}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <multiselect
                    v-model="query.limit"
                    placeholder="Select limit"
                    :options="limits"
                    :searchable="false"
                    :allow-empty="false"
                    @select="changeLimit">
                </multiselect>
            </div>
            <br>
            <div>
                <paginate
                    :page-count="meta_employees.last_page"
                    :click-handler="changePaginate"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'"
                    :prev-class="'page-item'"
                    :prev-link-class="'page-link'"
                    :next-class="'page-item'"
                    :next-link-class="'page-link'">
                </paginate>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'employes',
        data() {
            return {
                cur_url: null,
                isLoading: false,
                fullPage: true,
                employees: null,
                meta_employees: null,
                msg: 'product-list',
                selected_department: null,
                all_departments: { id: 0, title: 'All', slug: 'all' },
                departments: null,
                query: {
                    page: 1,
                    limit: 10,
                },
                query_url: null,
                limits: [10, 25, 50, 100],
                file: null,
            };
        },
        created() {
            this.cur_url = this.$route.path;
            this.getDepartments();
        },
        methods: {
            getDepartments() {
                this.axios.get('/api/get-departments').then((response) => {
                    this.departments = response.data.data;
                    this.departments.splice(0, 0, this.all_departments);
                    this.setQueryFromUlr();
                    this.getEmployees();
                });
            },
            getEmployees() {
                this.isLoading = true;
                this.axios.get('/api/get-employees', { params: this.query }).then((response) => {
                    this.employees = response.data.data;
                    this.meta_employees = response.data.meta;
                    this.isLoading = false;
                });
            },
            changePaginate(page) {
                this.query.page = page;
                this.setQuery();
            },
            changeLimit(limit) {
                this.query.page = 1;
                this.query.limit = limit;
                this.setQuery();
            },
            selectDepartment(department) {
                if (department.id === 0) {
                    this.cur_url = '/employes';
                } else {
                    this.cur_url = '/employes/' + department.slug;
                    this.setDepartment(department.slug);
                }
                this.setQuery();
            },
            setDepartment(selected_department) {
                let department = selected_department;
                if (this.$route.name === 'employes-department') {
                    department = this.$route.params.slug;
                }
                const dep = this.departments.filter(obj => {
                    return obj.slug === department;
                });
                this.selected_department = dep[0];
                if (department !== 'all') {
                    this.$set(this.query, 'department', this.selected_department.id);
                }
            },
            setQueryFromUlr() {
                const query = this.$route.query;
                if (Object.keys(query).length !== 0) {
                    for (const key in query) {
                        this.$set(this.query, key, query[key]);
                    }
                }
                this.setDepartment('all');
            },
            setQuery() {
                this.query_url = this.query;
                this.$delete(this.query_url, 'department');
                this.$router.push({
                    path: this.cur_url,
                    query: this.query_url,
                });
                this.setDepartment('all');
                this.getEmployees();
            },

            exportData() {
                this.isLoading = true;
                this.axios.get('/api/export',  { params: { department: this.selected_department.id } }).then((response) => {
                    this.isLoading = false;
                    window.open('/xml.xml', '_blank');
                });
            },
            importData() {
                if (this.file != null) {
                    this.isLoading = true;
                    const formData = new FormData();
                    formData.append('file', this.file);
                    this.axios.post('/api/import',  formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
                        this.getDepartments();
                    });
                }
            },

            uploadFile(event){
                this.file = event.target.files[0];
            }

        },
    };
</script>
