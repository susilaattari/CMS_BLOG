<?php

namespace App\Http\Controllers;

use App\Models\article;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return response()->json(auth()->User()->articles()->all());
        $article = article::all();
        return response()->json([$article],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title'=>'required|unique:articles|max:250',
            'content'=>'required',
            'image'=>'required|mimes:jpg,bmp,png'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $user = auth()->user();
            $article = $user->articles()->create([
                "user_id"=>$request->id,
                "title"=>$request->title,
                "content"=>$request->content,
                "image"=>$request->image
            ]);
            $response = [
                "message"=>"tambah data berhasil",
                "dataApi"=>$article
            ];

            return response()->json($response,Response::HTTP_OK);
        } catch (QueryException $th) {
            return response()->json([
                'message'=>"masalah di tabel databsae",
                "error"=>$th->errorInfo]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $articleById = article::find($id);
        if(!$articleById){
            return response()->json(['message'=>'not Found'],Response::HTTP_NOT_FOUND);
        }
        $validator = Validator::make($request->all(),[
            "title"=>'required',
            'content'=>'required',
            'image'=>'required|mimes:jpg,bmp,png'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $articleById->update($request->all());
            return response()->json(['message'=>'success update'],Response::HTTP_UNPROCESSABLE_ENTITY);

        }  catch (QueryException $th) {
            return response()->json([
                'message'=>"masalah di tabel databsae",
                "error"=>$th->errorInfo]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
