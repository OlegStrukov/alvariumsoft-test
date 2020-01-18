{!! '<'.'?xml version="1.0"?>' !!}
<catalog>
    <departments>
        @foreach($departments as $department)
            <department>
{{--                <id>{{ $department->id }}</id>--}}
                <title>{{ $department->title }}</title>
                <slug>{{ $department->slug }}</slug>
            </department>
        @endforeach
    </departments>
    <employees>
        @foreach($employees as $employee)
            <employee>
{{--                <id>{{ $employee->id }}</id>--}}
                <fullname>{{ $employee->full_name }}</fullname>
                <date_of_birth>{{ $employee->date_of_birth }}</date_of_birth>
                <department_id>{{ $employee->department_id }}</department_id>
                <position>{{ $employee->position }}</position>
                <type>{{ $employee->type }}</type>
                <payment>{{ $employee->payment }}</payment>
                <cur_m_hours>{{ $employee->cur_m_hours }}</cur_m_hours>
            </employee>
        @endforeach
    </employees>
</catalog>
