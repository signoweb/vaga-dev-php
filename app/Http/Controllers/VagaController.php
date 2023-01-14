<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVagaRequest;
use App\Http\Requests\UpdateVagaRequest;
use App\Models\Vaga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VagaController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Vaga::class, 'vaga');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        $params = $request->collect();
        $quantidade = isset($params['quantidade']) ? $params['quantidade'] : 20;

        $vagas = Vaga::filtrarPorParametros($params);

        $candidato = false;
        // Candidatos e convidados são considerados candidatos
        if (!$user || $user->role == 'candidato') {
            $candidato = true;

            $vagas = $vagas->where('pausada', false)->paginate($quantidade);
            // Se usuario for candidato e estiver logado,
            // Adiciona se o usuario está candidatado ou não.
            if ($user) {
                $vagas->transform(function ($vaga) use ($user) {
                    return ['candidatado' => $user->vagas()->where('vaga_id', $vaga['id'])->exists(), ...$vaga->toArray()];
                });
            }
        }
        // Se usuario for empresa, só mostra vagas que o usuario criou.
        else if ($user->role == 'empresa') {
            $vagas = $vagas->where('user_id', $user->id)->paginate($quantidade);
        }
        else {
            $vagas = $vagas->paginate($quantidade);
        }
        return Inertia::render('Vaga/Index', ['vagas' => $vagas, 'candidato' => $candidato, 'params' => count($params) == 0 ? null : $params]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Vaga/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreVagaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVagaRequest $request)
    {
        
        Vaga::create([...$request->validated(), 'user_id' => auth()->user()->id]);
        return redirect()->route('vagas.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function show(Vaga $vaga)
    {
        $user = auth()->user();
        $vaga['candidatado'] = $user ? $user->vagas()->where('vaga_id', $vaga['id'])->exists() : false;
        $candidato = $user ? $user->role == 'candidato' : true;
        return Inertia::render('Vaga/Show', ['vaga' => [...$vaga->toArray(), 'candidatos' => $vaga->candidatos], 'candidato' => $candidato]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function edit(Vaga $vaga)
    {
        return Inertia::render('Vaga/Edit', ['vaga' => $vaga]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateVagaRequest  $request
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVagaRequest $request, Vaga $vaga)
    {
        $vaga->update($request->validated());
        return redirect()->route('vagas.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vaga $vaga)
    {
        $vaga->delete();
        return redirect()->route('vagas.index');
    }
}
