<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller {

    public function index() {
        $old_name = Request::old('name');
        $old_surname = Request::old('surname');
        $old_email = Request::old('email');
        $old_username = Request::old('username');
        return view('register')
            ->with('csrf_token', csrf_token())
            ->with(compact('old_name', 'old_surname', 'old_email', 'old_username'));
    }

    public function create() {
        $request = request();
        $validator=Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users|alpha_dash',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'allow' => 'required',
        ]);
        if ($validator->fails()) {
            return redirect('register')
            ->withErrors($validator)
            ->withInput();
        }
        $propic = $request->file('avatar');
        $path = public_path('images');
        if($request->propic){
            $filename = time() . '.' . $propic->getClientOriginalExtension();
            $propic->move($path, $filename);
            $request->propic = $filename;
        }
        
        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'propic' => $request->propic,
        ]);
        $user->saveOrFail();
        $user_id = $user->id;
        Session::put('user_id', $user_id);
        return redirect('home');
    }

    public function checkUsername($query) {
        $exist = User::where('username', $query)->exists();
        return ['exists' => $exist];
    }

    public function checkEmail($query) {
        $exist = User::where('email', $query)->exists();
        return ['exists' => $exist];
    }
}
?>