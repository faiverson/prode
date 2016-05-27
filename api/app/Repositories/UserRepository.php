<?php
namespace App\Repositories;

use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Abstracts\Repository as AbstractRepository;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserRepository extends AbstractRepository implements UserRepositoryInterface
{
    public function model()
    {
        return User::class;
    }

    public function isUser($fields, $select)
    {
        $query = $this->model->select($select)->where('active', 1);
        if(array_key_exists('username', $fields)) {
            $query->where('username', $fields['username']);
        }
        elseif(array_key_exists('email', $fields)) {
            $query->where('email', $fields['email']);
        }
        else {
            return false;
        }

//        $query = $query->join('role_user', function ($join) {
//                $join->on('users.id', '=', 'role_user.user_id');
//            })
//            ->join('roles', function ($join) use($fields) {
//                $type = is_array($fields['type']) ? $fields['type'] : [$fields['type']];
//                $join->on('roles.id', '=', 'role_user.role_id')
//                    ->whereIn('roles.name', $type);
//            });
//        dd($query->toSql());
//        dd($query->getBindings());
        return $query->first();
    }

    public function addRole($user_id, $role_id)
    {
        return $this->model->find($user_id)->attachRole($role_id);
    }

    public function detachRole($user_id, $role_id)
    {
        return $this->model->find($user_id)->detachRole($role_id);
    }

    public function addRoles($user_id, $roles)
    {
        return $this->model->find($user_id)->attachRoles($roles);
    }

    public function detachRoles($user_id, $roles)
    {
        return $this->model->find($user_id)->detachRoles($roles);
    }

    public function all($columns = array('*'), $limit = null, $offset = null, $order_by = null, $filters = array()) {
        $query = $this->model->with('roles');
        $query = $this->setFilters($query, $filters);
        if($limit != null) {
            $query = $query->take($limit);
        }

        if($offset != null) {
            $query = $query->skip($offset);
        }

        if($order_by != null) {
            foreach($order_by as $column => $dir) {
                $query = $query->orderBy($column, $dir);
            }
        }

        return $query->get($columns);
    }

    public function setFilters($query, $filters)
    {
        foreach($filters as $key => $w) {
            switch($key) {
                case 'from':
                    $from = new DateTime($w);
                    $query = $query->whereDate('created_at', '>=', $from);
                    break;
                case 'to':
                    $to = new DateTime($w);
                    $query = $query->whereDate('created_at', '<=', $to);
                    break;
                case 'email':
                    $query = $query->where('email', 'LIKE', $w . '%');
                    break;
                case 'first_name':
                    $query = $query->where('first_name', 'LIKE', $w . '%');
                    break;
                case 'last_name':
                    $query = $query->where('last_name', 'LIKE', $w . '%');
                    break;
                case 'username':
                    $query = $query->where('username', 'LIKE', $w . '%');
                    break;
                case 'full_name':
                    $name = explode(' ', $w);
                    $query = $query->where('first_name', 'like', $name[0] . '%')
                        ->where('last_name', 'like', $name[1]  . '%');
                    break;
                case 'user_id':
                    $query = $query->where('id', $w);
                    break;
                case 'type':
                    $query = $query->where('type', $w);
                    break;
                case 'customer_id':
                    $query = $query->where('customer_id', $w);
                    break;
            }
        }
        return $query;
    }
}