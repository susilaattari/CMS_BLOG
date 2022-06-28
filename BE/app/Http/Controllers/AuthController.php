<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function register(){
        $validator = Validator::make(request()->all(),[
            'name'=>'required',
            'email'=>'required|unique:users|email',
            'password'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(),422);
        }
        $user = User::Create([
            'name'=>request('name'),
            'email'=>request('email'),
            'password'=>Hash::make(request('password'))
        ]);
        if ($user) {
            return response()->json([
                'message'=>'pendaftaran Berhasil',
                'data'=>$user
            ],Response::HTTP_CREATED);
        }else{
            return response()->json([
                'message'=>'pendaftaran Gagal'
            ],Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $validator = Validator::make(request()->all(),[
            'email'=>'required',
            'password'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(),422);
        }
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email Belum Terdaftar'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->User());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
