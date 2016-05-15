<?php

namespace App\Models;

use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Model;
use Sofa\Eloquence\Eloquence;
use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends Model
{
    use EntrustUserTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    protected $getterMutators = [
        'first_name' => 'strtolower|ucwords',
        'last_name' => 'strtolower|ucwords',
        'username' => 'strtolower',
        'fullname' => 'strtolower|ucwords',
        'email' => 'strtolower'
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'phone', 
        'active',
        'type',
        'password',
        'ip_address',
        'info'
    ];

    protected $appends = array('full_name');

    protected $hidden = ['id', 'password', 'remember_token', 'active', 'updated_at', 'deleted_at'];

    public function setPhoneAttribute($value)
    {
        $this->attributes['phone'] = !empty($value) ? preg_replace("/[^0-9]/", "", $value) : '';
    }

    public function getFullnameAttribute()
    {
        return ucfirst($this->attributes['first_name']) . " " . ucfirst($this->attributes['last_name']);
    }

    public function getUserIdAttribute()
    {
        return $this->attributes['id'];
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = ucwords(strtolower($value));
    }

    public function setLastNameAttribute($value)
    {
        $this->attributes['last_name'] = ucwords(strtolower($value));
    }

    public function setUsernameAttribute($value)
    {
        $this->attributes['username'] = strtolower($value);
    }

    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = strtolower($value);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
    }

}