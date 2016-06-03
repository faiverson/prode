<?php

namespace App\Http\Controllers\Auth;

use App\Repositories\UserRepository;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use DB;
use App\Helpers\Token;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    public function admin(Request $request)
    {
        $request->type = 'admin';
        return $this->login($request);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $username = $request->input('username');
        $password = $request->input('password');

        if (($email || $username) && $password) {
            try {
                $info = [
                    'email' => $email,
                    'username' => $username,
                    'active' => 1,
                    'type' => $request->type ? $request->type : 'user'
                ];

                $u = $this->userRepository->isUser($info, ['users.id', 'password']);
                if (empty($u)) {
                    return response()->error('Invalid Credentials', 401);
                }

                if (!Hash::check($password, $u->password)) {
                    return response()->error('Wrong Password', 401);
                }

                if (!$u->ability('admin', $request->type)) {
                    return response()->error('Invalid Credentials', 401);
                }

                $token = Token::add($u->id);
                if ($token) {
                    return response()->ok(compact('token'));
                }
                return response()->error('Invalid Credentials', 401);
            } catch (JWTException $e) {
                return response()->error('Could not create a token', $e->getStatusCode());
            }
        }
        return response()->error("The credentials are wrong", 400);
    }

    public function renewToken(Request $request)
    {
        $id = $request->id;
        if ($id) {
            try {
                $u = DB::table('users')
                    ->select('id', 'password')
                    ->where('active', 1)
                    ->where('id', $id)
                    ->first();

                if (empty($u)) {
                    return response()->error('Invalid Credentials', 401);
                }

                $token = Token::add($u->id);
                if ($token) {
                    return response()->ok(compact('token'));
                }
            } catch (JWTException $e) {
                return response()->error('Could not create a token', $e->getStatusCode());
            }
        }
        return response()->error("The credentials are wrong", 400);
    }

    public function logout(Request $request)
    {
        $response = Token::deprecate($request);
        return !is_string($response) ? response()->ok() : response()->error($response);
    }
}
