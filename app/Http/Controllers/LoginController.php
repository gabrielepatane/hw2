<?php

use Illuminate\Routing\Controller;
use App\Models\User;

class LoginController extends Controller {

    public function login() {
        if(session('user_id') != null) {
            return redirect('home');
        }
        else {
            $old_username = Request::old('username');
            return view('login')
                ->with('csrf_token', csrf_token())
                ->with('old_username', $old_username);
        }
    }

    public function checkLogin() {
        $user = User::where('username', request('username'))->where('password', password_verify(request('password'), 'password'))->first();
        if(isset($user)) {
            Session::put('user_id', $user->id);
            return redirect('home');
        }
        else {
            return redirect('login')->withInput();
        }
    }

    public function logout() {
        Session::flush();
        return redirect('/');
    }
}
?>